import os

def rename_dwg(dwg_dir):
    names = os.listdir(dwg_dir)
    for i, name in enumerate(names):
        os.rename(
            os.path.join(dwg_dir, name),
            os.path.join(dwg_dir, str(i)+"."+name[-3:])
        )

if __name__ == "__main__":
    rename_dwg("../drawings")
