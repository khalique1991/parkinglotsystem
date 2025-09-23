/*
package com.parkinglotsystem.controller;

import com.parkinglotsystem.constant.AppConstant;
import com.parkinglotsystem.dtos.ApiResponse;
import com.parkinglotsystem.entity.Reservation;
import com.parkinglotsystem.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;
    @PostMapping("/create")
    public ApiResponse<Reservation> createReservation(@RequestParam Long VehicleId,@RequestParam Long spotId){
        Reservation reservation=reservationService.createReservation(VehicleId,spotId);
        return ApiResponse.<Reservation>builder().status(AppConstant.SUCCESS).message("reservation Created").data(reservation).build();

    }
    @PostMapping("{id}/end")
    public ApiResponse<Reservation> end(@PathVariable Long id){
        Reservation reservation=reservationService.endReservation(id);
        return ApiResponse.<Reservation>builder().status(AppConstant.SUCCESS).message("Reservation end").data(reservation).build();
    }
    @GetMapping("/{id}")
    public ApiResponse<Reservation> active(){
        return ApiResponse.<Reservation>builder().status(AppConstant.SUCCESS).message("Active Reservations").data(reservationService.getActiveReservations()).build();
    }
    @GetMapping("/{id}")
    public ApiResponse<Reservation> getById(@PathVariable Long id ){
        return ApiResponse.<Reservation>builder().status(AppConstant.SUCCESS).message("Fetched reservation").data(reservationService.getReservationById(id)).build();
    }

}
*/
