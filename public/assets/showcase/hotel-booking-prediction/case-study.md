# Case Study

Hotel booking cancellations pose a significant challenge for revenue management and operational planning in the hospitality industry. Accurately predicting whether a booking will be canceled allows hotels to optimize pricing strategies, overbooking policies, and resource allocation. This study focuses on predicting booking confirmation status (Canceled vs Not Canceled) using customer, booking, and pricing attributes, framed as a binary classification problem.

## Dataset

The dataset contains 36,275 hotel booking records with 19 attributes describing guest demographics, stay duration, meal plans, parking requirements, room types, lead time, arrival information, booking history, pricing, and special requests. The target variable, booking_status, indicates whether a reservation was canceled. The identifier column Booking_ID was removed as it carries no predictive value. The dataset exhibits class imbalance, with Not Canceled bookings occurring approximately twice as often as Canceled bookings.

![Raw Dataset](/assets/showcase/hotel-booking-prediction/dataset.jpg)

## Data Cleaning

Several columns contained missing values, notably type_of_meal_plan, required_car_parking_space, and avg_price_per_room. Missing meal plan entries were logically mapped to Not Selected, while rows with missing parking and price information were removed due to ambiguity and strong dependency on booking characteristics. Duplicate entries (9,031 records) were also removed to prevent training bias, resulting in a cleaner and more representative dataset.

## Exploratory Data Analysis

Numerical features showed strong skewness and numerous outliers, particularly in variables such as number of children, previous bookings, and lead time. Categorical variables were similarly skewed toward lower-cost and simpler booking options. Although the target variable was imbalanced, the skewness and outliers were retained, as tree-based models are robust to these properties and removing them could reduce real-world representativeness.

![EDA - Numeric](/assets/showcase/hotel-booking-prediction/eda-numeric.jpg)
![EDA - Categorical](/assets/showcase/hotel-booking-prediction/eda-categoric.jpg)

## Preprocessing

Because tree-based classifiers were used, feature scaling was not applied. All categorical variables were encoded using Label Encoding, as ordinal relationships do not negatively impact decision tree splits. The dataset was split into training (80%) and testing (20%) sets before encoding to prevent data leakage. Encoders for each categorical feature and the target variable were saved to ensure consistency during inference.

## Modeling Approach

Two ensemble classifiers were trained: Random Forest and XGBoost. Hyperparameter optimization was performed using GridSearchCV, with macro F1-score as the evaluation metric to account for class imbalance. Random Forest tuning focused on tree depth, number of estimators, feature selection strategy, and class weighting, while XGBoost tuning optimized learning rate, subsampling ratios, regularization terms, and class balance parameters.

```
Best Random Forest Hyperparameters
{'bootstrap': True,
 'class_weight': 'balanced',
 'max_depth': 20,
 'max_features': 'log2',
 'min_samples_leaf': 1,
 'min_samples_split': 5,
 'n_estimators': 300}
```
```
Best XGBoost Hyperparameters
{'colsample_bytree': 0.8,
 'gamma': 0,
 'learning_rate': 0.1,
 'n_estimators': 200,
 'reg_alpha': 0.1,
 'reg_lambda': 1,
 'scale_pos_weight': 1,
 'subsample': 1.0}
```

## Evaluation – Random Forest

The optimized Random Forest model achieved an accuracy of 86%, with balanced precision and recall across classes. Performance was strongest for the Not Canceled class, reflecting the underlying class distribution. Moderate confusion remained for canceled bookings, indicating overlap in booking patterns between confirmed and canceled reservations despite class balancing.

```
              precision    recall  f1-score   support

    Canceled       0.75      0.74      0.75      1369
Not_Canceled       0.90      0.91      0.90      3512

    accuracy                           0.86      4881
   macro avg       0.83      0.82      0.83      4881
weighted avg       0.86      0.86      0.86      4881
```

![Random Forest Confusion Matrix](/assets/showcase/hotel-booking-prediction/cm-random-forest.jpg)

## Evaluation – XGBoost

XGBoost slightly outperformed Random Forest, achieving an accuracy of 87% and higher recall for the Not Canceled class. While this resulted in improved overall accuracy, it also introduced slightly increased bias toward confirmed bookings. Nevertheless, XGBoost demonstrated superior ability to model nonlinear relationships in booking behavior.

```
              precision    recall  f1-score   support

    Canceled       0.79      0.71      0.75      1369
Not_Canceled       0.89      0.93      0.91      3512

    accuracy                           0.87      4881
   macro avg       0.84      0.82      0.83      4881
weighted avg       0.86      0.87      0.86      4881
```

![XGBoost Confusion Matrix](/assets/showcase/hotel-booking-prediction/cm-xgboost.jpg)

## Conclusion

This study shows that ensemble-based tree models, particularly XGBoost, are effective for predicting hotel booking confirmation status using structured reservation data. Despite class imbalance and feature skewness, careful preprocessing and macro-F1–based optimization produced reliable results. Future improvements may include cost-sensitive learning, resampling strategies, or explainability methods such as SHAP to better understand cancellation drivers.