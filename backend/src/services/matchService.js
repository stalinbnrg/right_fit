function scoreCandidate(user, expectation) {
  if (!user || !expectation) return 0;
  let score = 0;

  // Age (inclusive)
  if (
    user.age != null &&
    expectation.preferred_age_min != null &&
    expectation.preferred_age_max != null
  ) {
    if (
      user.age >= parseInt(expectation.preferred_age_min, 10) &&
      user.age <= parseInt(expectation.preferred_age_max, 10)
    )
      score += 20;
  }

  // Caste
  if (expectation.preferred_caste && user.caste) {
    if (
      user.caste.toLowerCase().includes(expectation.preferred_caste.toLowerCase())
    )
      score += 15;
  }

  // Religion
  if (expectation.preferred_religion && user.religion) {
    if (
      user.religion.toLowerCase().includes(expectation.preferred_religion.toLowerCase())
    )
      score += 10;
  }

  // Education
  if (expectation.preferred_education && user.education) {
    if (
      user.education.toLowerCase().includes(expectation.preferred_education.toLowerCase())
    )
      score += 10;
  }

  // Occupation
  if (expectation.preferred_occupation && user.occupation) {
    if (
      user.occupation.toLowerCase().includes(expectation.preferred_occupation.toLowerCase())
    )
      score += 10;
  }

  // Salary (inclusive)
  if (
    user.salary != null &&
    expectation.preferred_salary_min != null &&
    expectation.preferred_salary_max != null
  ) {
    const s = parseFloat(user.salary);
    if (
      s >= parseFloat(expectation.preferred_salary_min) &&
      s <= parseFloat(expectation.preferred_salary_max)
    )
      score += 15;
  }

  // Height (inclusive)
  if (
    user.height_cm != null &&
    expectation.preferred_height_min != null &&
    expectation.preferred_height_max != null
  ) {
    const h = parseFloat(user.height_cm);
    if (
      h >= parseFloat(expectation.preferred_height_min) &&
      h <= parseFloat(expectation.preferred_height_max)
    )
      score += 10;
  }

  // Location (city/state/country)
  if (expectation.preferred_location_city && user.location_city) {
    if (user.location_city.toLowerCase() === expectation.preferred_location_city.toLowerCase()) score += 5;
  }
  if (expectation.preferred_location_state && user.location_state) {
    if (user.location_state.toLowerCase() === expectation.preferred_location_state.toLowerCase()) score += 3;
  }
  if (expectation.preferred_location_country && user.location_country) {
    if (user.location_country.toLowerCase() === expectation.preferred_location_country.toLowerCase()) score += 2;
  }

  // Other expectations (keywords)
  if (expectation.other_expectations && user.about_me) {
    const keywords = expectation.other_expectations.toLowerCase().split(/[,;]+/);
    const about = user.about_me.toLowerCase();
    keywords.forEach((kw) => {
      if (kw && about.includes(kw.trim())) score += 2;
    });
  }

  return score;
}

module.exports = { scoreCandidate };
