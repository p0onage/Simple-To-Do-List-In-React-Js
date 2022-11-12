using GetToDoList.Models;
using Microsoft.AspNetCore.Mvc;
using ToDoListApi.Data;
using ToDoListApi.Services;

namespace ToDoListApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDoListController : ControllerBase
{
    private readonly ILogger<ToDoListController> _logger;
    private readonly IToDoListService _toDooDoListService;

    public ToDoListController(ILogger<ToDoListController> logger, IToDoListService toDooDoListService)
    {
        _logger = logger;
        _toDooDoListService = toDooDoListService;
    }

    [HttpGet(Name = "GetToDoList")]
    public IEnumerable<ToDoList> Get()
    {
        return _toDooDoListService.GetToDoList();
    }
}