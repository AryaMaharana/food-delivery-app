package com.fooddelivery.model;
import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Entity @Getter @Setter @NoArgsConstructor
public class MenuItem { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @Column(nullable=false) String name; String description; @Column(nullable=false) BigDecimal price; String imageUrl; boolean available=true; @ManyToOne @JoinColumn(name="restaurant_id") Restaurant restaurant; }