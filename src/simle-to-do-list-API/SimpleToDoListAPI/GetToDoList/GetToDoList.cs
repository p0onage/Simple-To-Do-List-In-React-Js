using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using GetToDoList.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GetToDoList;

public static class GetToDoList
{
    [FunctionName("GetToDoList")]
    public static async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");
        var todos = new List<ToDoList>()
        {
            new ToDoList()
            {
                Name = "Test TestOne",
                ItemId = 1,
            }
        };
        return (ActionResult)new OkObjectResult(todos);
    }
}