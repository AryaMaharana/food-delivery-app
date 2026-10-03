package com.fooddelivery.model;
import jakarta.persistence.*; import lombok.*; import java.util.*;
@Entity @Getter @Setter @NoArgsConstructor
public class Restaurant { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @Column(nullable=false) String name; String description; String address; String phoneNumber; String imageUrl; @ManyToOne User owner; @OneToMany(mappedBy="restaurant",cascade=CascadeType.ALL) List<MenuItem> menuItems=new ArrayList<>(); }