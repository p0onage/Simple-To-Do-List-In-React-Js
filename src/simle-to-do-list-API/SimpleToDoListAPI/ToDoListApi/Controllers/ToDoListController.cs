using GetToDoList.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using ToDoListApi.Data;
using ToDoListApi.Models;
using ToDoListApi.Services;

namespace ToDoListApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToDoListController : ControllerBase
{
    private readonly ILogger<ToDoListController> _logger;
    private readonly IToDoListService _toDooDoListService;

    public ToDoListController(ILogger<ToDoListController> logger, IToDoListService toDooDoListService)
    {
        _logger = logger;
        _toDooDoListService = toDooDoListService;
    }

    [HttpGet("GetToDoList")]
    public IEnumerable<ToDoList> GetToDoList()
    {
        return _toDooDoListService.GetToDoList();
    }
    
    [HttpPost("ToggleComplete")]
    public void ToggleComplete([FromBody] int itemId)
    {
        _toDooDoListService.ToggleComplete(itemId);
    }
    
    [HttpPost("AddToDo")]
    public void AddToDo([FromBody] string name)
    {
        _toDooDoListService.AddToDo(new ToDoList()
        {
            Name = name
        });
    }
}