using Nazarii.FileBrowser.Domain;

namespace Nazarii.FileBrowser.Repositories
{
    public interface IFileRepository
    {
        FolderStatistics GetFolderStatistics(string path);
        Directory GetDirectoryInfo(string path);
    }
}