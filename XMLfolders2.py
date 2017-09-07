
import os
from xml.sax.saxutils import escape as xml_escape

def DirAsXML(path):
    result = '<folder>\n<name>%s</name>\n' % xml_escape(os.path.basename(path))
    dirs = []
    files = []
    for item in os.listdir(path):
        itempath = os.path.join(path, item)
        if os.path.isdir(itempath):
            x = DirAsXML(os.path.join(path, item))
            //print ('<folder>\n<name>' + item + '\n</name>')
            #result += '\n'.join('  ' + line for line in x.split('\n'))
        elif os.path.isfile(itempath):
            files.append(item)
    if files:
        result += '  <files>\n' \
                  + '\n'.join('    <file>\n      <name>%s</name>\n    </file>'
                              % xml_escape(f) for f in files) + '\n  </files>\n'
        result += '</folder>'
    return result

if __name__ == '__main__':
    print '<structure>\n' + DirAsXML('icons') + '\n</structure>'