package com.parkinglotsystem.util;


import com.parkinglotsystem.constant.AppConstant;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for DateTime formatting and parsing.
 * Java 8 compatible.
 */
public final class DateTimeUtil {
    private DateTimeUtil() {}

    public static String format(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(AppConstant.DATE_TIME_FORMAT);
        return dateTime.format(formatter);
    }

    public static LocalDateTime parse(String dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(AppConstant.DATE_TIME_FORMAT);
        return LocalDateTime.parse(dateTime, formatter);
    }
}
