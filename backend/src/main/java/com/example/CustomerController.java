package com.example.customer;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ItemController {

    private final ItemRepository repo;

    public ItemController(ItemRepository repo) {
        this.repo = repo;
    }


    @GetMapping
    public List<InventoryItem> getItems() {
        return repo.findAll();
    }


    @PostMapping
    public InventoryItem addItem(@RequestBody InventoryItem item) {
        return repo.save(item);
    }


    @PutMapping("/{id}")
    public InventoryItem updateItem(@PathVariable Long id, @RequestBody InventoryItem updatedItem) {
        return repo.findById(id).map(item -> {
            item.setName(updatedItem.getName());
            item.setCategory(updatedItem.getCategory());
            item.setQuantity(updatedItem.getQuantity());
            item.setMinLimit(updatedItem.getMinLimit());
            return repo.save(item);
        }).orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
    }

    
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
