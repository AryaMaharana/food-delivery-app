package com.fooddelivery.gateway;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class ModuleCatalogController {

    private final DiscoveryClient discoveryClient;

    public ModuleCatalogController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/api/modules")
    public List<ModuleDescriptor> modules() {
        return discoveryClient.getServices().stream()
                .flatMap(serviceId -> discoveryClient.getInstances(serviceId).stream())
                .map(this::toDescriptor)
                .filter(ModuleDescriptor::enabled)
                .collect(Collectors.toMap(
                        ModuleDescriptor::serviceId,
                        d -> d,
                        (first, second) -> first))
                .values().stream()
                .sorted(Comparator.comparingInt(ModuleDescriptor::order))
                .toList();
    }

    private ModuleDescriptor toDescriptor(ServiceInstance instance) {
        Map<String, String> m = instance.getMetadata();
        return new ModuleDescriptor(
                instance.getServiceId().toLowerCase(),
                m.getOrDefault("module-name", instance.getServiceId()),
                m.getOrDefault("ui-label", instance.getServiceId()),
                m.getOrDefault("ui-route", "/"),
                Boolean.parseBoolean(m.getOrDefault("module-enabled", "false")),
                Boolean.parseBoolean(m.getOrDefault("ui-enabled", "false")),
                Integer.parseInt(m.getOrDefault("ui-order", "100"))
        );
    }

    public record ModuleDescriptor(
            String serviceId,
            String moduleName,
            String label,
            String route,
            boolean enabled,
            boolean uiEnabled,
            int order) {
    }
}
