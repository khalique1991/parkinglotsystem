package com.parkinglotsystem.service.impl;


import com.parkinglotsystem.dto.NotificationMessage;
import com.parkinglotsystem.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void notifyParkingStarted(Long customerId, Long sessionId) {
        String msgText = "Your parking session " + sessionId + " has started.";
        sendEmail(customerId, "Parking Session Started", msgText);
        sendWebSocket(customerId, "Parking Session Started", msgText);
    }

    @Override
    public void notifyPaymentStatus(Long customerId, Long reservationId, String status) {
        String msgText = "Payment for reservation " + reservationId + " is " + status;
        sendEmail(customerId, "Payment Status", msgText);
        sendWebSocket(customerId, "Payment " + status, msgText);
    }

    private void sendEmail(Long customerId, String subject, String text) {
        String email = getEmailByCustomerId(customerId);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
        log.info("Email sent to {}: {}", email, text);
    }

    private void sendWebSocket(Long customerId, String title, String message) {
        NotificationMessage notification = new NotificationMessage(title, message);
        messagingTemplate.convertAndSend("/topic/customer-" + customerId, notification);
        log.info("WebSocket sent to customer {}: {}", customerId, message);
    }

    private String getEmailByCustomerId(Long customerId) {
        // Stub: Replace with DB lookup
        return "customer" + customerId + "@example.com";
    }
}
