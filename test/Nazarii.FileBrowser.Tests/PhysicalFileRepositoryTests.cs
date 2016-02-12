using System;
using Nazarii.FileBrowser.Repositories;
using Xunit;

namespace Nazarii.FileBrowser.Tests
{
    public class PhysicalFileRepositoryTests
    {
        [Fact]
        public void PassingTest()
        {
            var repository = new PhysicalFileRepository(2, 5, 10);
            var result = repository.GetFolderStatistics("./TestFolder");
            Assert.Equal(9, result.SmallFiles);
            Assert.Equal(4, result.BigFiles);
            Assert.Equal(6, result.MiddleFiles);
        }
    }
}