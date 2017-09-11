
import os
from xml.sax.saxutils import escape as xml_escape

def DirAsJSON(path):

    result = ''
    dirs = []
    files = []

    for item in os.listdir(path):
        itempath = os.path.join(path, item)
        if os.path.isdir(itempath):

            if (item[6:7] == '-' or
                    item == 'svg'):
                dirs.append(item)
            else:
                continue
        elif os.path.isfile(itempath):
            if item[-3:] == 'svg':
                files.append(item)
            else:
                continue
    if files:
        result += '\n \"folderElements\" : ['

        last = len(files) - 1

        for i, x in enumerate(files):
            if i == last:
                result += '\"%s\"' % (x)

            else:
                result += '\"%s\",' % (x)
        result += ']'


    if dirs:
        for d in dirs:
            if d == 'svg':
                x = DirAsJSON(os.path.join(path, d))
                for line in x.split('\n'):
                    result += '\n' + line + '\n'
            else:
                result += '{\n\"folderName\": \"' + d[7:] + '\",\n'
                result += '\"folderUrl\": \"' + path + '/' + d + '\",\n'
                x = DirAsJSON(os.path.join(path, d))
                result += ''.join(line for line in x.split('\n'))
                result += '\n},\n'
    return result

if __name__ == '__main__':

    print (DirAsJSON('IconsDesign'))
    f = open('map.json', 'w')
    output = "{list : \n["
    output += DirAsJSON('IconsDesign')
    output += "]\n}"
    f.write(output)