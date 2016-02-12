using System;
using System.Linq;
using Nazarii.FileBrowser.Repositories;
using Xunit;

namespace Nazarii.FileBrowser.Tests
{
    public class PhysicalFileRepositoryTests
    {
        [Fact]
        public void GetFolderStatisticsTest()
        {
            var repository = new PhysicalFileRepository(2, 5, 10);
            var result = repository.GetFolderStatistics("./TestFolder");
            Assert.Equal(9, result.SmallFiles);
            Assert.Equal(4, result.BigFiles);
            Assert.Equal(6, result.MiddleFiles);
        }

        [Fact]
        public void GetDirectoryInfoTest()
        {
            var repository = new PhysicalFileRepository(2, 5, 10);
            var result = repository.GetDirectoryInfo("./TestFolder");
            Assert.Equal(4, result.Children.Count());
        }

        [Fact]
        public void GetDirectoryInfoTest1()
        {
            var repository = new PhysicalFileRepository(2, 5, 10);
            var result = repository.GetDirectoryInfo("./TestFolder/Test");
            Assert.Equal(8, result.Children.Count());
        }
    }
}