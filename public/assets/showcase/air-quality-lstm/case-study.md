# Case Study
Air quality has a significant impact on public health, particularly in urban environments where pollutant concentrations can change rapidly over time. Accurate short-term air quality prediction enables early warnings and supports environmental decision-making. This study focuses on predicting hourly ambient temperature (AT) as a proxy target using historical air quality and meteorological data, leveraging a Long Short-Term Memory (LSTM) neural network to capture temporal dependencies in multivariate time-series data.

## Dataset

The dataset consists of 50,400 hourly records collected between 2017 and 2023, containing 23 variables that describe pollutant concentrations (e.g., PM2.5, PM10, NO₂, SO₂, CO, Ozone) and meteorological conditions (e.g., temperature, humidity, wind speed, wind direction, rainfall). Two timestamp columns define the hourly intervals, and the data exhibit substantial missing values across multiple pollutant measurements, which is common in long-term environmental monitoring datasets.

![Raw Dataset](/assets/showcase/air-quality-lstm/dataset.jpg)

## Data Cleaning

Timestamp columns were converted to datetime format and sorted chronologically to preserve temporal ordering. Column names were standardized by removing units for cleaner processing. The dataset was split into training (80%), validation (10%), and testing (10%) sets prior to cleaning to prevent data leakage. Missing values were handled using forward-fill and backward-fill interpolation, leveraging the continuity of time-series data, and no duplicate records were found.

## Preprocessing

Exploratory analysis revealed strong skewness and outliers across most pollutant variables. To address this, a hybrid Robust–MinMax scaling strategy was applied: RobustScaler followed by MinMaxScaler for most features to reduce outlier influence, while MinMaxScaler alone was used for Relative Humidity (RH) and Wind Direction (WD) due to their fixed physical bounds. All features were normalized to the [0,1] range to improve neural network training stability.

![Scaled Dataset](/assets/showcase/air-quality-lstm/dataset-scaled.jpg)

## Sequence Construction

The prediction task was framed as a supervised sequence-to-one regression problem, using a sliding window of the previous 5 hours of multivariate observations to predict the next-hour ambient temperature. Custom PyTorch dataset and dataloader classes were implemented to efficiently generate sequential samples while preserving temporal structure during training and evaluation.

```py
import numpy as np
from torch.utils.data import Dataset
from typing import List

class SequenceDataset(Dataset):
    def __init__(
            self,
            df: pd.DataFrame,
            seq_len: int,
            feature_cols: List[str],
            target_cols: List[str]
        ):
        self.x = []
        self.y = []
        
        # 2D array containing the values of the X and Y columns
        array = df[feature_cols + target_cols].values

        for i in range(len(df) - seq_len):
            # Sliding window for 5 previous input to 1 current output
            self.x.append(array[i:i+seq_len, :len(feature_cols)])
            self.y.append(array[i+seq_len, -len(target_cols):])

        # Convert to fp32 tensor
        self.x = torch.tensor(np.array(self.x), dtype=torch.float32)
        self.y = torch.tensor(np.array(self.y), dtype=torch.float32)

    def __len__(self):
        return len(self.x)
    
    def __getitem__(self, idx):
        return self.x[idx], self.y[idx]
```

## Baseline Model

A baseline LSTM model with a single recurrent layer and 10 hidden units was trained using Mean Squared Error (MSE) loss and the Adam optimizer. Early stopping was applied to prevent overfitting. Despite stable training, the baseline model failed to capture meaningful temporal patterns, resulting in poor generalization performance and indicating underfitting.

```
Evaluation Result:
    MAE: 16.952400392075127
    MSE: 305.7720154729182
    R2: -15.646508208202757
```

## Hyperparameter Optimization

To improve performance, Optuna was used for automated hyperparameter tuning, exploring LSTM hidden sizes and the number of recurrent layers. The optimization objective minimized validation loss with early stopping. The best configuration consisted of 34 hidden units and 7 LSTM layers, demonstrating the importance of deeper temporal representations for complex air quality dynamics.

## Modified Model Performance

The optimized LSTM model significantly outperformed the baseline, achieving a Mean Absolute Error (MAE) of 2.01, MSE of 6.28, and R² score of 0.66 on the test dataset. In contrast, the baseline model produced a negative R² value, indicating performance worse than a naïve mean predictor. These results confirm that the tuned LSTM effectively captured temporal dependencies in the air quality data.

```
Evaluation Result:
    MAE: 2.0100042201446584
    MSE: 6.280122091135835
    R2: 0.6581044090090471
```

## Conclusion

This study demonstrates that deep LSTM architectures combined with robust preprocessing and careful temporal data handling can effectively model complex air quality time-series data. Hyperparameter optimization played a critical role in improving predictive performance, transforming an underperforming baseline into a reliable forecasting model. Future work may extend this approach to multi-step forecasting, additional pollutant targets, or spatially distributed sensor networks.