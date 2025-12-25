# Case Study
Obesity is a major public health concern associated with increased risk of chronic diseases such as diabetes, cardiovascular disorders, and metabolic syndromes. Early identification of obesity levels can support preventive healthcare and personalized intervention strategies. This study aims to develop a multi-class obesity classification model using demographic, lifestyle, and behavioral data, leveraging machine learning techniques to accurately predict obesity severity levels.

## Dataset

The dataset contains 1,056 individual records with 17 attributes describing physical characteristics, dietary habits, physical activity, and lifestyle behaviors. Key features include age, height, weight, family history of overweight, dietary patterns, water intake, physical activity frequency, alcohol consumption, and transportation mode. The target variable, NObeyesdad, represents ordered obesity levels ranging from Insufficient Weight to Obesity Type III, making this an ordinal multi-class classification problem.

![Dataset sample](/assets/showcase/obesity-prediction/dataset.jpg)

## Data Cleaning

Initial inspection revealed missing values, duplicate entries, and inconsistent data types, particularly in the Age column where numeric values were mixed with strings (e.g., “21 years”). To avoid introducing bias in sensitive medical data, rows containing missing values were dropped instead of imputed, and duplicate records were removed. The age column was cleaned using regular expressions to extract numeric values and converted to integer format, ensuring consistency across training and testing datasets.

## Data Splitting

To prevent data leakage and testing contamination, the dataset was split into training (80%) and testing (20%) sets prior to cleaning. All cleaning operations, including null removal and duplicate elimination, were applied separately to each split. This approach ensures that model evaluation reflects real-world generalization performance rather than memorization of cleaned patterns.

## Preprocessing

Categorical variables were encoded based on their semantic meaning. Binary features were label-encoded, ordinal features such as food consumption frequency and alcohol intake were ordinally encoded using predefined category orders, and nominal features such as gender and transportation mode were one-hot encoded. The target variable was encoded as an ordinal class reflecting increasing obesity severity. Feature scaling was not applied, as tree-based models were used, which are robust to feature magnitude differences.

![Preprocessed Dataset](/assets/showcase/obesity-prediction/preprocessed.jpg)

## Modeling

Two ensemble-based classifiers were trained: Random Forest and XGBoost. Hyperparameter tuning was performed using GridSearchCV to optimize model performance. Random Forest parameters focused on tree depth, number of estimators, and split criteria, while XGBoost tuning emphasized learning rate, subsampling ratio, tree depth, and boosting stages. Both models were trained on the fully encoded feature set.

## Evaluation – Random Forest

The Random Forest model achieved an overall accuracy of 90% on the test dataset. It performed strongly on extreme obesity classes such as Obesity Type II and Obesity Type III, with high precision and recall. However, moderate confusion was observed between adjacent classes such as Overweight Level I and Overweight Level II, indicating overlapping feature patterns in borderline cases. Overall, the model demonstrated solid performance but showed limitations in distinguishing closely related weight categories.

```
                     precision    recall  f1-score   support

Insufficient_Weight       0.96      0.88      0.92        25
      Normal_Weight       0.82      0.91      0.86        35
     Obesity_Type_I       0.94      0.94      0.94        31
    Obesity_Type_II       1.00      0.97      0.99        34
   Obesity_Type_III       0.97      1.00      0.98        28
 Overweight_Level_I       0.87      0.80      0.83        25
Overweight_Level_II       0.75      0.75      0.75        20

           accuracy                           0.90       198
          macro avg       0.90      0.89      0.90       198
       weighted avg       0.91      0.90      0.90       198
```

![Confusion Matrix - Random Forest](/assets/showcase/obesity-prediction/cm-random-forest.jpg)

## Evaluation – XGBoost

The XGBoost model outperformed Random Forest, achieving an overall accuracy of 95%. It demonstrated excellent class-wise performance across all obesity levels, including near-perfect precision and recall for severe obesity categories. Misclassifications were minimal and primarily occurred between neighboring classes such as Normal Weight and Overweight Level I. The results indicate that XGBoost is more effective at capturing complex nonlinear relationships within lifestyle and physiological data.

```
                     precision    recall  f1-score   support

Insufficient_Weight       0.96      0.96      0.96        25
      Normal_Weight       0.97      0.91      0.94        35
     Obesity_Type_I       0.97      0.97      0.97        31
    Obesity_Type_II       1.00      0.97      0.99        34
   Obesity_Type_III       1.00      1.00      1.00        28
 Overweight_Level_I       0.88      0.88      0.88        25
Overweight_Level_II       0.87      1.00      0.93        20

           accuracy                           0.95       198
          macro avg       0.95      0.96      0.95       198
       weighted avg       0.96      0.95      0.95       198
```

![Confusion Matrix - XGBoost](/assets/showcase/obesity-prediction/cm-xgboost.jpg)

## Conclusion

This study demonstrates that ensemble-based machine learning models, particularly XGBoost, can accurately classify obesity severity using lifestyle and biometric features. The approach highlights the importance of careful preprocessing, ordinal-aware encoding, and robust evaluation strategies in medical datasets. While the model performs strongly, future work may incorporate feature importance analysis, SHAP explainability, or longitudinal data to improve interpretability and clinical relevance.