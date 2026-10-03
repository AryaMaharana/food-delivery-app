package com.fooddelivery.model;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDateTime;
@Entity @Table(name="users") @Getter @Setter @NoArgsConstructor
public class User { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @Column(unique=true,nullable=false) String email; @Column(nullable=false) String password; @Column(nullable=false) String fullName; String address; String phoneNumber; @Enumerated(EnumType.STRING) UserRole role=UserRole.CUSTOMER; LocalDateTime createdAt; @PrePersist void create(){createdAt=LocalDateTime.now();} }