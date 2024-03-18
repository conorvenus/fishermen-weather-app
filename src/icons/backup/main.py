# for each svg icon in the icons folder, convert it to valid jsx

import os

for name in os.listdir():
    if not name.endswith(".jsx"):
        continue
    with open(name, "r") as f:
        contents = f.read()
        # replace fill-rule with fillRule,
        # replace clip-rule with clipRule
        # replace clip-path with clipPath
        # replace stop-color with stopColor
        # replace class with className
        contents = contents.replace("fill-rule", "fillRule")
        contents = contents.replace("clip-rule", "clipRule")
        contents = contents.replace("clip-path", "clipPath")
        contents = contents.replace("stop-color", "stopColor")
        contents = contents.replace("class", "className")
        with open(f"new/{name}", "w+") as f2:
            f2.write(contents)