import csv
import json

max_rows = 50

def csv_to_json(csv_file, json_file):
    data = []

    with open(csv_file, 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        columns_to_keep = list(csv_reader.fieldnames[:-1])  # Bỏ cột cuối cùng
        
        for i, row in enumerate(csv_reader):
            if max_rows and i >= max_rows:  # Giới hạn số dòng (nếu có)
                break
            filtered_row = {col: row[col] for col in columns_to_keep if col in row}
            data.append(filtered_row)


    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

csv_file = 'dataset.csv'
json_file = 'dataset.json'

csv_to_json(csv_file, json_file)
print('OK')