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
            var repository = new PhysicalFileRepository();
            var result = repository.GetFolderStatistics("./TestFolder");
            Assert.Equal(8, result.SmallFiles);
        }
    }
}