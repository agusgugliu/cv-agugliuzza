from rembg import remove
from PIL import Image

x_image = input('Image Name:\t')
x_format = input('Image Format:\t')

input_path = "C:\\Users\\Usr\\Documents\\GitHub\\cv-agugliuzza\\images\\certificates\\" + x_image + '.' + x_format

output_path = "C:\\Users\\Usr\\Documents\\GitHub\\cv-agugliuzza\\images\\certificates\\" + x_image + '_bck.png'

input = Image.open(input_path)
output = remove(input)

output.save(output_path)