using GetToDoList.Models;
using Microsoft.Extensions.Caching.Memory;

namespace ToDoListApi.Data;

public class ToDoListRepository : IToDoListRepository
{
    private readonly IMemoryCache _memoryCache;
    private readonly string cacheKey = "ToDoList";
    
    public ToDoListRepository(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
        if (!_memoryCache.TryGetValue(cacheKey, out IEnumerable<ToDoList> cacheValue))
        {
            var todo = new List<ToDoList>()
            {
                new ToDoList()
                {
                    Name = "Testdknfdn",
                    done = false
                }
            };
            _memoryCache.Set(cacheKey, todo);
        }
    }
    
    public void UpdateToDoList(IEnumerable<ToDoList> todo)
    {
        _memoryCache.Set(cacheKey, todo);
    }

    public IEnumerable<ToDoList> GetToDoList()
    {
        if (_memoryCache.TryGetValue(cacheKey, out IEnumerable<ToDoList> cacheValue))
        {
            return cacheValue;
        }
        return new List<ToDoList>();
    }
}

public interface IToDoListRepository
{
    public void UpdateToDoList(IEnumerable<ToDoList> todo);
    public IEnumerable<ToDoList> GetToDoList();
}