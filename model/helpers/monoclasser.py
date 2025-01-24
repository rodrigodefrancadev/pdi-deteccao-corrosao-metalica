import os

# Caminho para a pasta das anotações
annotations_paths = [
    "./../datasets/Rust Detection.v1i.yolov11-monoclass/test/labels",
    "./../datasets/Rust Detection.v1i.yolov11-monoclass/train/labels",
    "./../datasets/Rust Detection.v1i.yolov11-monoclass/valid/labels",
]

# Nova classe única
new_class_id = 0

def main():
    for annotations_path in annotations_paths:
        # Iterar por todos os arquivos de anotação
        for file_name in os.listdir(annotations_path):
            if file_name.endswith(".txt"):
                file_path = os.path.join(annotations_path, file_name)
                print("alterando " + file_path)
                with open(file_path, "r") as file:
                    lines = file.readlines()

                # Substituir as classes por uma classe única
                new_lines = []
                for line in lines:
                    parts = line.strip().split()
                    parts[0] = str(new_class_id)  # Alterar class_id
                    new_lines.append(" ".join(parts))

                # Salvar o arquivo atualizado
                with open(file_path, "w") as file:
                    file.writelines("\n".join(new_lines))


if __name__ == '__main__':
    main()