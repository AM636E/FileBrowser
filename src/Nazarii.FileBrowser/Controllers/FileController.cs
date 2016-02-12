using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using Nazarii.FileBrowser.Domain;
using Nazarii.FileBrowser.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Nazarii.FileBrowser.Controllers
{
    public class FileController : Controller
    {
        private readonly IFileRepository _fileRepository;
        public FileController(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }
        
        [HttpGet, Route("api/file/get")]
        public Directory Get()
        {
            var path = System.IO.Directory.GetCurrentDirectory();
            if (Request.Query.ContainsKey("path")) path = Request.Query["path"];
            return _fileRepository.GetDirectoryInfo(path);
        }
        
        [HttpGet("api/file/info")]
        public FolderStatistics GetFolderStatistics()
        {
            var path = System.IO.Directory.GetCurrentDirectory();
            if (Request.Query.ContainsKey("path")) path = Request.Query["path"];
            return _fileRepository.GetFolderStatistics(path);
        }
    }
}
