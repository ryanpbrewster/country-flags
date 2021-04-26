#!/usr/bin/env python3

import collections
import csv
import json
import sys

def fetch_codes():
  codes = {}
  names = collections.defaultdict(list)
  with open("codes.csv", newline = '') as fin:
    reader = csv.reader(fin)
    assert next(reader) == ["Name", "Code"]
    for row in reader:
        name = row[0]
        code = row[1]
        codes[name] = code
        names[code].append(name)
    return codes, names
    

KIND_MALE = 'Population mid-year estimates for males (millions)'
KIND_FEMALE = 'Population mid-year estimates for females (millions)'
KIND_OLD = 'Population aged 60+ years old (percentage)'
KIND_YOUNG = 'Population aged 0 to 14 years old (percentage)'
KIND_AREA = 'Surface area (thousand km2)'
KIND_RATIO = 'Sex ratio (males per 100 females)'
KIND_DENSITY = 'Population density'
KIND_POPULATION = 'Population mid-year estimates (millions)'
KINDS = { KIND_MALE, KIND_FEMALE, KIND_OLD, KIND_YOUNG, KIND_AREA, KIND_RATIO, KIND_DENSITY, KIND_POPULATION, }
def process():
    codes, names = fetch_codes()
    seen_names, seen_codes = set(), set()
    by_code = {}
    with open("data.csv", newline = '') as fin:
        reader = csv.reader(fin)
        next(reader) # filename
        next(reader) # header
        for row in reader:
            name = row[1]
            year = int(row[2])
            kind = row[3]
            value = float(row[4])

            assert kind in KINDS
            seen_names.add(name)

            if name not in codes:
                continue
            code = codes[name]
            seen_codes.add(code)

            if code not in by_code:
                by_code[code] = {"name": name}
            if kind == KIND_POPULATION and year == 2020:
                by_code[code]["population"] = value
            if kind == KIND_AREA:
                by_code[code]["area"] = value

    missing = names.keys() - seen_codes
    if len(missing) > 0:
        print(f"Missing data:", file = sys.stderr)
        for name in sorted(missing):
            print(f"  - {name}", file = sys.stderr)

    unknown = seen_names - codes.keys()
    if len(unknown) > 0:
        print(f"Unknown:", file = sys.stderr)
        for name in sorted(unknown):
            print(f"  - {name}", file = sys.stderr)

    json.dump(by_code, sys.stdout)

if __name__ == "__main__":
    process()
