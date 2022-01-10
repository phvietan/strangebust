# strangebust algorithm

When fuzzing, strangebust will do the following actions:
- 1. Send a 404 HTTP requests to: `<url>/<random_generated_length_32_string>`
- 2. Send HTTP requests using each line in wordlist files: <url>/<wordlist_line>
- 3. Attemp to filter (please refer to files at `/src/libs/filter`):
  + 3.1. Ignores responses that has 404 status code
  + 3.2. FilterDominantStatus:
    * 3.2.1: Count number of occurrence of every response status code
    * 3.2.2: Qualifies all responses that appears too little (< 10% of total number of responses)
  + 3.3: FilterSimilarity:
    * 3.3.1: For through all responses and check if the response.body is similar to the response body of the 1. step `<url>/<random_generated_length_32_string>`, if it is not similar (score < 50) then the response qualifies the check.
    * Similarity score check is defined at: `/src/libs/filter/similarity.ts`
  + 3.4: CaptchaCheck:
    * For through all qualifies responses and check if it is captcha by checking their content is similar with each other.
    * strangebust tries to remove responses that are similar with other responses
- 4. Output qualified responses
