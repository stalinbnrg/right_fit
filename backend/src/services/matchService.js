function scoreCandidate(user, expectation){
    if(!user || !expectation) return 0;
    let score = 0;
    
    // Age
    if(user.age && expectation.preferred_age_min != null && expectation.preferred_age_max != null){
        if(user.age >= expectation.preferred_age_min && user.age <= expectation.preferred_age_max)
            score += 20;
    }

    // caste
    if(expectation.preferred_caste && user.caste && expectation.preferred_caste.toLowerCase() === user.caste.toLowerCase())score += 15;
    // Religion
    if (expectation.preferred_religion && user.religion && expectation.preferred_religion.toLowerCase() === user.religion.toLowerCase()) score += 10;
    // Education
    if (expectation.preferred_education && user.education && expectation.preferred_education.toLowerCase() === user.education.toLowerCase()) score += 10;
    // Occupation
    if (expectation.preferred_occupation && user.occupation && expectation.preferred_occupation.toLowerCase() === user.occupation.toLowerCase()) score += 10;

    // Salary
    if (user.salary != null && expectation.preferred_salary_min != null && expectation.preferred_salary_max != null) {
        const s = parseFloat(user.salary);
        if (s >= parseFloat(expectation.preferred_salary_min) && s <= parseFloat(expectation.preferred_salary_max)) score += 15;
    }

    // Location - simple substring match across city/state/country vs preferred_location
    if (expectation.preferred_location && (
        (user.location_city && expectation.preferred_location.toLowerCase().includes(user.location_city.toLowerCase())) ||
        (user.location_state && expectation.preferred_location.toLowerCase().includes(user.location_state.toLowerCase())) ||
        (user.location_country && expectation.preferred_location.toLowerCase().includes(user.location_country.toLowerCase()))
    )) score += 10;

    // Other expectations - naive substring check
    if (expectation.other_expectations && user.about_me && user.about_me.toLowerCase().includes(expectation.other_expectations.toLowerCase())) score += 10;

    return score;
}

module.exports = { scoreCandidate };