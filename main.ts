// Tiny stack ISA v1 VM: a faithful port of the reference vm.mjs semantics.
import { mkdirSync as mk, readdirSync as ls, readFileSync as rd, writeFileSync as wr } from 'node:fs';
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input', O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
// opcode -> [immediate bytes, pops, pushes]
const T: number[][] = [];
'00000 01101 02401 03010 04012 05022 06023 07033 17011 1b011 30200 33200 34000 40011 50010 51010 52001 53010'
  .split(' ').concat('10 11 12 13 14 15 16 18 19 1a 1c 1d 1e 20 21 22'.split(' ').map(h => h + '021'), ['31210', '32210', '41020'])
  .forEach(s => T[parseInt(s.slice(0, 2), 16)] = [+s[2], +s[3], +s[4]]);
function run(P: Uint8Array, X: Uint8Array): [number[], number] {
  const n = P.length, D = new Int32Array(256), C: number[] = [], M = new Int32Array(256), o: number[] = [];
  let sp = 0, pc = 0, st = 0, ip = 0;
  for (;;) {
    if (st == 1e6) return [o, 10];
    if (pc < 0 || pc >= n) return [o, 9];
    const op = P[pc], t = T[op];
    if (!t) return [o, 5];
    if (pc + t[0] >= n) return [o, 9];
    st++;
    const nx = pc + 1 + t[0];
    if (sp < t[1]) return [o, 2];
    if (sp - t[1] + t[2] > 256) return [o, 3];
    pc = nx;
    const b = D[sp - 1], a = D[sp - 2];
    switch (op) {
      case 0: return [o, 0];
      case 1: D[sp++] = P[pc - 1] << 24 >> 24; break;
      case 2: D[sp++] = P[pc - 4] | P[pc - 3] << 8 | P[pc - 2] << 16 | P[pc - 1] << 24; break;
      case 3: sp--; break;
      case 4: D[sp++] = b; break;
      case 5: D[sp - 1] = a; D[sp - 2] = b; break;
      case 6: D[sp++] = a; break;
      case 7: D[sp - 1] = D[sp - 3]; D[sp - 3] = a; D[sp - 2] = b; break;
      case 0x17: D[sp - 1] = -b; break;
      case 0x1b: D[sp - 1] = ~b; break;
      case 0x30: case 0x31: case 0x32: {
        const r = (P[pc - 2] | P[pc - 1] << 8) << 16 >> 16;
        if (op == 0x30 || (op == 0x31) == !D[--sp]) pc += r;
        break;
      }
      case 0x33: if (C.length == 64) return [o, 7]; C.push(pc); pc = P[pc - 2] | P[pc - 1] << 8; break;
      case 0x34: if (!C.length) return [o, 8]; pc = C.pop()!; break;
      case 0x40: if (b < 0 || b > 255) return [o, 6]; D[sp - 1] = M[b]; break;
      case 0x41: if (b < 0 || b > 255) return [o, 6]; M[b] = a; sp -= 2; break;
      case 0x50: { const s = '' + b; if (o.length + s.length > 65536) return [o, 11]; sp--; for (const c of s) o.push(c.charCodeAt(0)); break; }
      case 0x51: if (o.length >= 65536) return [o, 11]; o.push(D[--sp] & 255); break;
      case 0x52: D[sp++] = ip < X.length ? X[ip++] : -1; break;
      case 0x53: return [o, D[--sp] & 255];
      default: {
        if (op > 0x12 && op < 0x17 && !b) return [o, 4];
        const u = a >>> 0, v = b >>> 0, s = b & 31;
        D[sp - 2] = op == 0x10 ? a + b : op == 0x11 ? a - b : op == 0x12 ? Math.imul(a, b)
          : op == 0x13 ? (a == -2147483648 && b == -1 ? a : a / b) : op == 0x14 ? (b == -1 ? 0 : a % b)
          : op == 0x15 ? Math.floor(u / v) : op == 0x16 ? u % v : op == 0x18 ? a & b : op == 0x19 ? a | b
          : op == 0x1a ? a ^ b : op == 0x1c ? a << s : op == 0x1d ? a >> s : op == 0x1e ? a >>> s
          : op == 0x20 ? +(a == b) : op == 0x21 ? +(a < b) : +(u < v);
        sp--;
      }
    }
  }
}
for (const id of ls(I).sort()) {
  const d = `${I}/${id}/`, [o, e] = run(rd(d + 'program.bin'), rd(d + 'input.bin'));
  mk(`${O}/${id}`, { recursive: true });
  wr(`${O}/${id}/stdout.bin`, Buffer.from(o));
  wr(`${O}/${id}/exit.txt`, e + '\n');
}
