import os

frontend_dir = r"c:\xampp\htdocs\sendnaw\frontend"
old_url = "https://sendnawtechnologies.infinityfree.io"
new_url = "https://sendnawbackend.onrender.com"

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if old_url in content:
            new_content = content.replace(old_url, new_url)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Could not process {filepath}: {e}")

for root, dirs, files in os.walk(frontend_dir):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.json', '.html')):
            process_file(os.path.join(root, file))

print("Done updating URLs.")
