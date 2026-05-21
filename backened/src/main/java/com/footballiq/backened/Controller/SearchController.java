package com.footballiq.backened.Controller;

import com.footballiq.backened.DTO.SearchResultDTO;
import com.footballiq.backened.Service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/football")
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {

    private final SearchService searchService;
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public List<SearchResultDTO> search(@RequestParam String query) {
        return searchService.performSearch(query);
    }
}