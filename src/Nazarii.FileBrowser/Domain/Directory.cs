using System.Collections.Generic;

namespace Nazarii.FileBrowser.Domain
{
    public class Directory
    {
        public Directory() { }
        public Directory(string name)
        {
            Name = name;
        }

        public string FullPath { get; set; }
        public string Name { get; set; }
        public IEnumerable<Directory> Children { get; set; }
    }
}