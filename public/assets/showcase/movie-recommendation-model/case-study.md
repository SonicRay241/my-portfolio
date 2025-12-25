# Case Study
Streaming platforms such as Netflix host thousands of movies and TV shows, making content discovery increasingly difficult for users. Manual exploration is inefficient due to the volume and diversity of available titles. This study presents a content-based recommendation system that suggests similar Netflix titles by analyzing textual metadata, enabling users to discover relevant content without relying on viewing history or user interaction data.

## Dataset

The dataset consists of 8,807 Netflix titles with attributes including title, type (Movie or TV Show), director, cast, country, release year, rating, duration, genres, and description. Both movies and TV shows are included, with movies forming the majority of the dataset. Several fields contain missing values, particularly in director, cast, and country, which are common in large-scale entertainment datasets.

![Dataset sample](/assets/showcase/movie-recommendation-model/dataset.jpg)

## Data Preprocessing

Missing values were replaced with blank strings to prevent errors during text processing while preserving all entries. Multiple textual attributes were merged into a single combined feature, with higher weighting applied to titles and genres to emphasize their importance. Text normalization was performed through lowercasing and punctuation removal. Invalid rating values were removed, and movie durations were converted into numeric form. Extreme movie duration outliers were identified and removed using the Interquartile Range (IQR) method, resulting in a cleaned dataset of 8,354 titles.

## Exploratory Data Analysis

Exploratory analysis showed that movies dominate the catalog, with TV-MA and TV-14 being the most frequent content ratings. Movie durations followed a right-skewed distribution, while release years showed high concentration between the 1980s and 2020s, reflecting Netflix’s mix of classic and modern content. These distributions were considered valid and retained for modeling.

![Show Rating Frequency](/assets/showcase/movie-recommendation-model/rating-frequency.jpg)
![Release year EDA](/assets/showcase/movie-recommendation-model/release-year.jpg)

## Modeling Approach

Textual features were transformed into numerical vectors using TF-IDF (Term Frequency–Inverse Document Frequency), allowing distinctive words to carry more importance. Cosine similarity was then computed between all title vectors to measure semantic similarity. A recommendation function retrieves the top-N most similar titles to a given input by ranking cosine similarity scores.

## Results

The model produced intuitive recommendations based on content similarity. For example, querying Naruto returned related Naruto Shippuden movies and anime titles, while Stranger Things yielded thematically similar science-fiction and mystery series. These results demonstrate the model’s ability to capture genre, narrative, and contextual similarities using only metadata.

```py
def get_recommendations(title, cosine_sim=cosine_sim, top_n=10):
    title = title.lower()
    idx = title_to_index.get(title)

    if idx is None:
        return f"'{title}' not found in dataset."

    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get indices of top_n most similar (excluding itself at index 0)
    sim_scores = sim_scores[1:top_n+1]
    movie_indices = [i[0] for i in sim_scores]

    return df['title'].iloc[movie_indices]

get_recommendations("Naruto")
# 4731                      Naruto Shippuden : Blood Prison
# 28                      Naruto Shippûden the Movie: Bonds
# 27               Naruto Shippuden the Movie: Blood Prison
# 34      Naruto the Movie: Ninja Clash in the Land of Snow
# 30                            Naruto Shippuden: The Movie
# 29           Naruto Shippûden the Movie: The Will of Fire
# 32       Naruto the Movie 2: Legend of the Stone of Gelel
# 33      Naruto the Movie 3: Guardians of the Crescent ...
# 31            Naruto Shippuden: The Movie: The Lost Tower
# 6206                              Marvel Anime: Wolverine

get_recommendations("Stranger Things")
# 7538      Beyond Stranger Things
# 6837               Little Things
# 6708                THE STRANGER
# 6416                    Stranger
# 5885    Bureau of Magical Things
# 4858            Perfect Stranger
# 6132                  The Sinner
# 6215          Tiny Pretty Things
# 6448        The Umbrella Academy
# 6794                 Nightflyers

```

## Limitations

The system does not incorporate user preferences, watch history, or popularity trends, limiting personalization. Recommendation quality depends heavily on metadata completeness and description quality. Additionally, cosine similarity computation becomes computationally expensive as dataset size increases, making scalability a challenge for significantly larger catalogs.

## Conclusion

This study shows that a TF-IDF–based content recommendation system can effectively support content discovery on streaming platforms using only textual metadata. While simple and interpretable, the approach provides a strong baseline that can be extended with collaborative or hybrid recommendation techniques for improved personalization.