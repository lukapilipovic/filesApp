
import os
from xml.sax.saxutils import escape as xml_escape

def DirAsXML(path):
    result = '<dir>\n<name>%s</name>\n' % xml_escape(os.path.basename(path))
    dirs = []
    files = []
    for item in os.listdir(path):
        itempath = os.path.join(path, item)
        if os.path.isdir(itempath):
            dirs.append(item)
        elif os.path.isfile(itempath):
            files.append(item)
    if files:
        result += '  <files>\n' \
            + '\n'.join('    <file>\n      <name>%s</name>\n    </file>'
            % xml_escape(f) for f in files) + '\n  </files>\n'
    if dirs:
        for d in dirs:
            x = DirAsXML(os.path.join(path, d))
            if d == 'svg':
                result += '\n'.join('  ' + line for line in x.split('\n'))
            else:
                continue
        result += '</dir>'
    return result

if __name__ == '__main__':
    print '<structure>\n' + DirAsXML(os.getcwd()) + '\n</structure>'