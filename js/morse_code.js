const map = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  ',': '--..--',
  '.': '.-.-.-',
  '?': '..--..',
  ';': '-.-.-',
  ':': '---...',
  '/': '-..-.',
  '-': '-....-',
  "'": '.----.',
  '()': '-.--.-',
  '_': '..--.-',
  '@': '.--.-.',
  ' ': '.......'
};

const tree = {
  '.': {
    stop: 'E',
    '.': {
      stop: 'I',
      '.': {
        stop: 'S',
        '.': {
          stop: 'H',
          '.': {
            stop: '5'
          },
          '-': {
            stop: '4'
          }
        },
        '-': {
          stop: 'V',
          '-': {
            stop: '3'
          }
        }
      },
      '-': {
        stop: 'U',
        '.': {
          stop: 'F'
        },
        '_': {
          '.': {
            '.': {
              stop: '?'
            },
            '-': {
              stop: '_'
            }
          },
          '-': {
            stop: '2'
          }
        }
      }
    },
    '-': {
      stop: 'A',
      '.': {
        stop: 'R',
        '.': {
          stop: 'L',
          '-': {
            '.': {
              stop: '"'
            }
          }
        },
        '-': {
          '.': {
            stop: '+',
            '-': {
              stop: '.'
            }
          }
        }
      },
      '-': {
        stop: 'W',
        '.': {
          stop: 'P',
          '-': {
            '.': {
              stop: '@'
            }
          }
        },
        '-': {
          stop: 'J',
          '-': {
            stop: '1',
            '.': {
              stop: "'"
            }
          }
        }
      }
    }
  },
  '-': {
    stop: 'T',
    '.': {
      stop: 'N',
      '.': {
        stop: 'D',
        '.': {
          stop: 'B',
          '.': {
            stop: '6',
            '-': {
              stop: '-'
            }
          },
          '-': {
            stop: '='
          }
        },
        '-': {
          stop: 'X',
          '.': {
            stop: '/'
          }
        }
      },
      '-': {
        stop: 'K',
        '.': {
          stop: 'C',
          '-': {
            '.': {
              stop: ';'
            },
            '-': {
              stop: '!'
            }
          }
        },
        '-': {
          stop: 'Y',
          '.': {
            '-': {
              stop: '()'
            }
          }
        }
      }
    },
    '-': {
      stop: 'M',
      '.': {
        stop: 'G',
        '.': {
          stop: 'Z',
          '.': {
            stop: '7'
          },
          '-': {
            '-': {
              stop: ','
            }
          }
        },
        '-': {
          stop: 'Q'
        }
      },
      '-': {
        stop: 'O',
        '.': {
          '.': {
            stop: '8',
            '.': {
              stop: ':'
            }
          }
        },
        '-': {
          stop: 'CH',
          '.': {
            stop: '9'
          },
          '-': {
            stop: '0'
          }
        }
      }
    }
  }
};
class MorseCode {
  static encode (obj) {
    return this.recurse(obj, (str) => {
      let ary = str.split('');
      return ary.map(char => map[char.toUpperCase()] || '?').join(' ');
    });
  }

  static decode (obj, dichotomic) {
    return this.recurse(obj, (str) => {
      let ary = str.split(' ');
      for (let i in ary) {
        if (!dichotomic) {
          ary[i] = MorseCode.decodeCharacterByMap(ary[i]);
        } else {
          ary[i] = MorseCode.decodeCharacterByDichotomy(ary[i]);
        }
      }
      return ary.join('');
    });
  }

  static recurse (obj, func) {
    if (!obj.pop) {
      return func(obj);
    }

    let clone = [];
    for (let i = 0; i < obj.length; i++) {
      clone[i] = func(obj[i]);
    }
    return clone;
  }

  static decodeCharacterByMap (char) {
    for (let i in map) {
      if (map[i] == char) {
        return i;
      }
    }
    return ' ';
  }

  static decodeCharacterByDichotomy (char) {
    let sub = char.split('');
    return traverseNodeWithCharacters(tree, sub);

    function traverseNodeWithCharacters (node, chars) {
      let cur = chars.shift();
      if (!node[cur]) {
        return node.stop || '?';
      }
      return traverseNodeWithCharacters(node[cur], chars);
    }
  }
}

$(function(){
  console.log('exectued');
  for(let i = 65; i < 91; i++) {
    let char = String.fromCharCode(i);
    let morse_char = MorseCode.encode(char);
    console.log(morse_char);
    console.log(MorseCode.decode(morse_char));
  }
});
