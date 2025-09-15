package com.parkinglotsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parkinglotsystem.entity.ParkingLot;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.enums.SpotType;
import com.parkinglotsystem.service.ParkingService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBeans;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ParkingController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ParkingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // ✅ correct
    private ParkingService parkingService;

    @Test
    void testCreateParkingLot() throws Exception {
        ParkingLot parkingLot = ParkingLot.builder()
                .id(1L)
                .name("Lot A")
                .location("Downtown")
                .build();

        Mockito.when(parkingService.createParkingLot(Mockito.any()))
                .thenReturn(parkingLot);

        mockMvc.perform(post("/api/parking/parkinglots")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(parkingLot)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Lot A"));
    }

    @Test
    void testGetAvailableSpots() throws Exception {
        ParkingSpot parkingSpot = ParkingSpot.builder()
                .id(100L)
                .spotNumber("A1")
                .type(SpotType.SMALL)
                .occupied(false)
                .build();

        Mockito.when(parkingService.findAvailableSpots(1L))
                .thenReturn(Collections.singletonList(parkingSpot));

        mockMvc.perform(get("/api/parking/lots/1/available-spots"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].spotNumber").value("A1"))
                .andExpect(jsonPath("$[0].occupied").value(false));
    }
}
