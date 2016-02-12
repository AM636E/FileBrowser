using System;
using System.IO;
using System.Text;
using Nazarii.FileBrowser.Domain;
using Directory = Nazarii.FileBrowser.Domain.Directory;
using System.Linq;

namespace Nazarii.FileBrowser.Repositories
{
    public class PhysicalFileRepository : IFileRepository
    {
        private readonly int _smallSize;
        private readonly int _middleSize;
        private readonly long _bigSize;

        public PhysicalFileRepository(int smallSize, int middleSize, long bigSize)
        {
            _smallSize = smallSize;
            _middleSize = middleSize;
            _bigSize = bigSize;
        }

        public FolderStatistics GetFolderStatistics(string path)
        {
            var dirs = System.IO.Directory.GetFiles(ParsePath(path), "*.*", SearchOption.AllDirectories)
               .Where(it => it.Length < 260) // Exclude longs paths because is makes an error.
               .Select(it => new FileInfo(it).Length / 1000000) // Convert bytes to mb.
               .ToList();
            return new FolderStatistics
            {
                SmallFiles = dirs.Count(it => it < _smallSize),
                MiddleFiles = dirs.Count(it => it >= _smallSize && it <= _middleSize),
                BigFiles = dirs.Count(it => it > _bigSize)
            };
        }

        public Directory GetDirectoryInfo(string path)
        {
            var info = new DirectoryInfo(ParsePath(path));
            return new Directory
            {
                Name = info.Name,
                Children = info
                .EnumerateDirectories().Select(it => new Directory(it.Name))
                .Concat(info.EnumerateFiles().Select(it => new Directory(it.Name))),
                FullPath = $"/root/{info.FullName.Replace('\\', '/').Replace(@":", "")}"
            };
        }

        private static string ParsePath(string path)
        {
            if (path.IndexOf("/root/", StringComparison.Ordinal) != 0) return path;
            // Skipping /root/
            var builder = new StringBuilder(path.Substring(6));
            builder.Insert(1, ':');
            builder.Append(@"\");
            return builder.ToString();
        }
    }
}