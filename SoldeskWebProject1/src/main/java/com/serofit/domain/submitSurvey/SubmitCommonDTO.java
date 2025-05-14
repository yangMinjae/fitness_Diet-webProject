package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmitCommonDTO {
	private int uno;
	private double height;
	private double weight;
	private int age;
	private boolean gender;
	private String area;
	private String workoutTime;
	private String vegan;
	private int hit;
	private String favSport;
	private int workoutSplit;
	private String[] favoriteFood;
	private double activityLevel;
	private String[] supplements;
	private String recipeComplexity;
	private String goal;
	
	private int nOfSnacks;
	private int fatRatio;
	private int nOfScoops;
	private int restDays;
	private String nGoal;
}
