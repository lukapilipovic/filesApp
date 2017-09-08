
import os
from xml.sax.saxutils import escape as xml_escape

def DirAsXML(path):
    if (path[-3:] == 'svg'
            or path == 'icon'):
        result = ''
    else:
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
        result += ' <files>\n' \
            + '\n'.join('    <file>\n       %s\n    </file>'
            % xml_escape(f) for f in files) + '\n</files>\n'
    if dirs:
        for d in dirs:
            if d == 'svg':
                x = DirAsXML(os.path.join(path, d))
                result += '\n'.join('  ' + line for line in x.split('\n'))
            else:
                result += '<folder>\n<name>' + d[7:] + '</name>\n'
                x = DirAsXML(os.path.join(path, d))
                result += '\n'.join(line for line in x.split('\n'))
                result += '</folder>\n'
    return result

if __name__ == '__main__':
    f = open('map.xml', 'w')
    output = DirAsXML('IconsDesign')
    f.write(output)