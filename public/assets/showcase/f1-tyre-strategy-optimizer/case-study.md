# Case Study

This project focuses on optimizing Formula 1 tyre strategies using mathematical optimization. The objective is to minimize total race time by determining optimal tyre compound selection, stint lengths, and pit stop timing, while satisfying Formula 1 regulations and race constraints. The strategy problem is formulated and solved using Pyomo, a Python-based optimization framework.
![Optimizer vs Drivers](/assets/showcase/f1-tyre-strategy-optimizer/banner.jpg)

## Data Collection
Race data was collected from the [OpenF1 API](https:///openf1.org), including lap times, tyre compounds, and stint information. These data provide the basis for estimating tyre performance and degradation trends.

![Data Sample](/assets/showcase/f1-tyre-strategy-optimizer/data-sample.jpg)

## Tyre Modelling
Tyre performance was modeled by incorporating degradation effects, where lap times increase as stint length grows. Different tyre compounds exhibit distinct degradation behaviors, creating trade-offs between short, fast stints and longer, slower stints. This modelling approach allows the optimizer to capture realistic performance differences between compounds.

![Tyre Degradation Model](/assets/showcase/f1-tyre-strategy-optimizer/tyre-deg-model.jpg)

## Strategy Optimizing
The race strategy was formulated as a Mixed-Integer Linear Programming (MILP) problem in Pyomo. Binary decision variables represent tyre selection and pit stops, while continuous variables represent stint lengths and total race time. By solving the model, the optimizer outputs an optimal strategy specifying tyre usage per stint, number of pit stops, and estimated total race time.

```
# Sample Output

Track        : Monza
Race Laps    : 53
Pit Stop Time: 25.0

Available Tyres:
  SOFT_0 (Age: 5)
  SOFT_1 (Age: 6)
  SOFT_2 (Age: 4)
  SOFT_3 (Age: 3)
  SOFT_4 (Age: 3)
  MED_0 (Age: 7)
  MED_1 (Fresh)
  HARD_0 (Age: 15)

Max Tyre Age:
  SOFT: 8
  MEDIUM: 30
  HARD: 35

===== OPTIMIZED STRATEGY =====
Total race time: 4563.61 s
Stints used    : 3
Pit stops      : 2

Stint details:
  SOFT_4:
    Laps run : 5
    Stint time: 414.66 s
  MED_1:
    Laps run : 28
    Stint time: 2396.31 s
  HARD_0:
    Laps run : 20
    Stint time: 1702.64 s
```

## Results: Strategy Consistency Across Circuits
The optimization model produces circuit-adaptive tyre strategies that vary systematically with degradation characteristics. High-degradation circuits such as Singapore favor short soft-tyre stints followed by extended hard-tyre usage, while circuits like Suzuka, Monza, and Las Vegas avoid soft tyres entirely in favor of medium–hard combinations. Across all circuits, hard tyres dominate total race distance, reflecting their lower degradation and alignment with lifespan constraints.

![Tyre Strategy Results Compared to Drivers](/assets/showcase/f1-tyre-strategy-optimizer/strategy-results.jpg)

## Results: Tyre Usage Patterns
The model consistently deploys softer compounds in early race phases and transitions to harder compounds later. On high-degradation circuits, soft tyres are used close to their effective performance limit before switching to hard tyres, balancing early performance gains against cumulative degradation.

```
Tyre Usage from Model
       Track        Soft (%)      Medium (%)        Hard (%)  Total Laps
0  Singapore  37.1 (23 Laps)    0.0 (0 Laps)  62.9 (39 Laps)          62
1  Zandvoort  41.7 (30 Laps)    0.0 (0 Laps)  58.3 (42 Laps)          72
2     Jeddah  22.0 (11 Laps)    0.0 (0 Laps)  78.0 (39 Laps)          50
3     Suzuka    0.0 (0 Laps)  47.2 (25 Laps)  52.8 (28 Laps)          53
4      Monza    0.0 (0 Laps)  34.0 (18 Laps)  66.0 (35 Laps)          53
5  Las Vegas    0.0 (0 Laps)  42.0 (21 Laps)  58.0 (29 Laps)          50
```

## Results: Objective Function Behavior
Total race time is dominated by cumulative degradation-adjusted stint time, while pit stop losses contribute only 0.33%–0.85% of the objective value. Despite their small proportional contribution, pit stop penalties strongly influence strategy selection due to their discrete nature. Most circuits favor a single pit stop, while high degradation tracks like Suzuka adopts two pit stops when reduced stint degradation outweighs the additional pit lane penalty.

```
Stint to Pit Ratio
       Track  Total Stint Time (s)  Pit Stops  Total Pit Time (s)  Pit Time (%)
0  Singapore           6129.014256          1                29.1      0.004725
1  Zandvoort           5505.353729          1                18.5      0.003349
2     Jeddah           4727.878896          1                17.0      0.003583
3     Suzuka           5123.088028          2                44.0      0.008515
4      Monza           4520.329838          1                25.0      0.005500
5  Las Vegas           4934.726941          1                21.0      0.004238
```

## Results: Constraint Activation
The maximum lifespan constraint for hard tyres is active across all circuits, indicating degradation as the primary limiting factor for stint length. Soft tyre lifespan constraints are generally inactive, as the model restricts their usage well below maximum limits. All strategies satisfy mandatory compound usage and exact race distance constraints, confirming regulatory compliance and solution feasibility.

## Model Limitations
The optimization model is based on deterministic mathematical assumptions that cannot fully capture real-world race dynamics. It assumes ideal race conditions and does not account for traffic effects, on-track overtakes, driver errors, or interactions between vehicles, nor does it model external race events such as safety car deployments, virtual safety cars, weather variability, or race control interventions. Tyre degradation is represented as a smooth and consistent process up to the maximum allowable lifespan, without incorporating driver-specific preferences, driving styles, or subjective tyre feel. Consequently, the optimized strategies should be interpreted as theoretical baseline solutions under idealized conditions rather than exact representations of real Formula 1 race outcomes.