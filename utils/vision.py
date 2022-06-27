import os

def load_line(txt_file):
    x_y = []
    with open(txt_file, "r") as rf:
        lines = rf.readlines()
        for line in lines:
            line = line.strip().split(",")
            line = [float(i) for i in line]
            x_y.append(line)
    return x_y

x = load_line("../txt/1.txt")
print(x)
