
import os
from xml.sax.saxutils import escape as xml_escape

def DirAsXML(path):
    result = '<folder>\n<name>%s</name>\n' % xml_escape(os.path.basename(path))
    dirs = []
    files = []
    for item in os.listdir(path):
        itempath = os.path.join(path, item)
        if os.path.isdir(itempath):


            if (item[5:6] == '-' or
                    item == 'svg'):
                #print(item[6:])
                dirs.append(item)
            else:
                continue
        elif os.path.isfile(itempath):
            if item[-4:] == 'jpeg':
                files.append(item)
            else:
                continue
    if files:
        result += '  <files>\n' \
            + '\n'.join('    <file>\n      %s\n    </file>'
            % xml_escape(f) for f in files) + '\n  </files>\n'
    if dirs:
        for d in dirs:
            # if d != 'svg':
            x = DirAsXML(os.path.join(path, d))
            result += '\n'.join('  ' + line for line in x.split('\n'))
        result += '</folder>'
    return result

if __name__ == '__main__':
    print  DirAsXML('icons')