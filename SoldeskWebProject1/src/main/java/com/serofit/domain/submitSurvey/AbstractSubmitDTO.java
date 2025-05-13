package com.serofit.domain.submitSurvey;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Arrays;

public abstract class AbstractSubmitDTO {

    private SubmitCommonDTO cDTO = new SubmitCommonDTO();

    public SubmitCommonDTO getcDTO() {
        return cDTO;
    }

    public void setcDTO(SubmitCommonDTO cDTO) {
        this.cDTO = cDTO;
    }

    private SubmitCommonDTO getOrCreateCDTO() {
        if (cDTO == null) cDTO = new SubmitCommonDTO();
        return cDTO;
    }

    @JsonProperty("cDTO.uno")
    public void setUno(String raw) {
        getOrCreateCDTO().setUno(Integer.parseInt(raw));
    }

    @JsonProperty("cDTO.height")
    public void setHeight(String raw) {
        getOrCreateCDTO().setHeight(Double.parseDouble(raw));
    }

    @JsonProperty("cDTO.weight")
    public void setWeight(String raw) {
        getOrCreateCDTO().setWeight(Double.parseDouble(raw));
    }

    @JsonProperty("cDTO.age")
    public void setAge(String raw) {
        getOrCreateCDTO().setAge(Integer.parseInt(raw));
    }

    @JsonProperty("cDTO.gender")
    public void setGender(String raw) {
        getOrCreateCDTO().setGender(Boolean.parseBoolean(raw));
    }

    @JsonProperty("cDTO.area")
    public void setArea(String raw) {
        getOrCreateCDTO().setArea(raw);
    }

    @JsonProperty("cDTO.workoutTime")
    public void setWorkoutTime(String raw) {
        getOrCreateCDTO().setWorkoutTime(raw);
    }

    @JsonProperty("cDTO.vegan")
    public void setVegan(String raw) {
        getOrCreateCDTO().setVegan(raw);
    }

    @JsonProperty("cDTO.hit")
    public void setHit(String raw) {
        getOrCreateCDTO().setHit(Integer.parseInt(raw));
    }

    @JsonProperty("cDTO.favSport")
    public void setFavSport(String raw) {
        getOrCreateCDTO().setFavSport(raw);
    }

    @JsonProperty("cDTO.workoutSplit")
    public void setWorkoutSplit(String raw) {
        getOrCreateCDTO().setWorkoutSplit(Integer.parseInt(raw));
    }

    @JsonProperty("cDTO.favoriteFood")
    public void setFavoriteFood(String raw) {
        if (raw != null && !raw.isBlank()) {
            String[] foods = Arrays.stream(raw.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toArray(String[]::new);
            getOrCreateCDTO().setFavoriteFood(foods);
        }
    }

    @JsonProperty("cDTO.activityLevel")
    public void setActivityLevel(String raw) {
        getOrCreateCDTO().setActivityLevel(Double.parseDouble(raw));
    }

    @JsonProperty("cDTO.supplements")
    public void setSupplements(String[] raw) {
        getOrCreateCDTO().setSupplements(raw);
    }

    @JsonProperty("cDTO.recipeComplexity")
    public void setRecipeComplexity(String raw) {
        getOrCreateCDTO().setRecipeComplexity(raw);
    }

    @JsonProperty("cDTO.goal")
    public void setGoal(String raw) {
        getOrCreateCDTO().setGoal(raw);
    }
}