package com.serofit.domain;

public enum ValTagEnum {
	DIET("다이어트", "다이어터"),
    BULK_UP("멸치 탈출", "멸치탈출"),
    STRENGTH("프로 득근러", "프로득근러"),
    HEALTH("건강 유지", "헬스키퍼"),
    MAINTAIN("체중 유지", "유지어터");

    private final String value; // jsp에서 넘어온 값
    private final String label; // DB에 넣을 값

    ValTagEnum(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public String getLabel() {
        return label;
    }

    public static String toLabel(String inputValue) {
        for (ValTagEnum goal : values()) {
            if (goal.value.equals(inputValue)) {
                return goal.label;
            }
        }
        throw new IllegalArgumentException("Unknown goal value: " + inputValue);
    }
}
