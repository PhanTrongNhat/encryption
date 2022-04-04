import  bigInt from "big-integer";
//thuat toan Euclid mo rong
export function GCD_Extended(a, b) {
  let s = bigInt(0),
    old_s = bigInt(1);
  let t = bigInt(1),
    old_t = bigInt(0);
  let r = b,
    old_r = a;
  while (r.isZero() != true) {
    let quotient = old_r.divide(r);
    let temp_r = r;
    let temp_s = s;
    let temp_t = t;
    r = old_r.subtract(quotient.multiply(r));
    old_r = temp_r;
    s = old_s.subtract(quotient.multiply(s));
    old_s = temp_s;
    t = old_t.subtract(quotient.multiply(t));
    old_t = temp_t;
  }
  if (old_r.lesser(0)) {
    old_r = bigInt(0).subtract(old_r);
    old_s = bigInt(0).subtract(old_s);
    old_s = bigInt(0).subtract(old_t);
  }
  return {
    gcd: old_r,
    x: old_s,
    y: old_t,
  };
}
//tinh (x^p) mod n
export function PowerMod(x, p, n) {
  let y = bigInt(1);
  if (p.equals(0)) {
    return y;
  }
  let A = x;
  let bin_p = p.toArray(2).value;
  if (bin_p[bin_p.length - 1] == 1) {
    y = x;
  }
  for (let i = bin_p.length - 2; i >= 0; i--) {
    A = A.multiply(A).mod(n);
    if (bin_p[i] == 1) {
      y = y.multiply(A).mod(n);
    }
  }
  return y;
}
/////////////////////
//sinh so ngau nhien nam trong khoang 2^(n-1)+1 -> 2^n-1
export function nBitRandom(n) {
  return bigInt.randBetween(
    bigInt(2)
      .pow(n - 1)
      .add(1),
    bigInt(2).pow(n).subtract(1)
  );
}
//thuc hien phep kiem tra so nguyen to (Rabin Miller primality test)
//bang chung kiem tra
export function Witness(a, prime_candidate) {
  //phan giai (prime_cadidate - 1) ve dang 2^k*m
  let maxDivisonByTwo = 0; //k
  let m = prime_candidate.subtract(1); //m
  while (m.mod(2) == 0) {
    m = m.shiftRight(1);
    maxDivisonByTwo += 1;
  }
  //
  let x = PowerMod(a, m, prime_candidate);
  let y;
  if (x.equals(1)) {
    return true;
  } else {
    let i = 1;
    while (i <= maxDivisonByTwo) {
      y = PowerMod(x, bigInt(2), prime_candidate);
      if (y.equals(1)) {
        if (x.equals(prime_candidate.subtract(1))) {
          return true;
        } else {
          return false;
        }
      }
      i += 1;
      x = y;
    }
  }
  return false;
}
//kiem tra Rabin-Miller Primality test
export function RabinMillerTest(prime_candidate, numberOfTrials) {
  for (let i = 0; i < numberOfTrials; i++) {
    let a = bigInt.randBetween(bigInt(2), prime_candidate);
    if (!GCD_Extended(prime_candidate, a).gcd.equals(bigInt(1))) {
      return false;
    } else if (
      !PowerMod(a, prime_candidate.subtract(1), prime_candidate).equals(1)
    ) {
      return false;
    } else {
      if (Witness(a, prime_candidate)) {
        return true;
      }
    }
  }
  return false;
}
//sinh large prime
export function genLargePrime(n) {
  let numberOfTrials = 20;
  while (true) {
    let prime_candidate = nBitRandom(n);
    if (RabinMillerTest(prime_candidate, numberOfTrials)) {
      return prime_candidate;
    } else {
      continue;
    }
  }
}
//sinh cap khoa public key va private key
export const  genKey = ()=>{
     let nBits = 1024;
  let p_prime = genLargePrime(nBits / 2);
  let q_prime = genLargePrime(nBits / 2);
  let n_mul = p_prime.multiply(q_prime);
  let phi = p_prime.subtract(1).multiply(q_prime.subtract(1));
  let public_key;
  let private_key;
  while (true) {
    public_key = nBitRandom(nBits);
    let value = GCD_Extended(phi, public_key);
    if (value.gcd.notEquals(1)) {
      continue;
    } else {
      private_key = value.y;
      if (private_key.lesser(0)) {
        private_key = private_key.add(phi);
      }
      break;
    }
  }
  console.log(1);
  return {
    public_key: public_key.toString(),
    private_key: private_key.toString(),
    n: n_mul.toString(),
    phi: phi.toString(),
    p: p_prime.toString(),
    q: q_prime.toString(),
  };
}
export function encrypt_RSA(m, public_key, n) {
  return PowerMod(m, public_key, n);
}
export function decrypt_RSA(c, private_key, n) {
  return PowerMod(c, private_key, n);
}
//console.log(genLargePrime(1024).value);
//console.log("public key",result.public_key.value);
//console.log("private key",result.private_key.value);
//console.log("phi",result.phi.value);
// console.log(result.p.value);
// console.log(result.q.value);
// let cipher = PowerMod(m, result.public_key, result.n);
// console.log("cipher text", cipher.value);
// let plain = PowerMod(cipher, result.private_key, result.n);
// console.log("plain text", plain.value);


//chuyển từ dạng chuỗi về dạng số bigInt có thể mã hóa RSA được
//lưu ý rằng chuỗi có 16 kí tự vài dùng AES 128bit
export function ConvertFromStringToNumber(str, lengthOfKey = 128) {
  if (str.length * 8 != lengthOfKey) {
    return false;
  }
  let str_result = "";
  for (var i = 0; i < str.length; i++) {
    var a = str.charCodeAt(i).toString(2);
    a = new Array(8 - a.length + 1).join('0') + a;
    str_result += a;
  }
  return bigInt(str_result, 2);
}


//chuyển một số bigInt sang dạng chuỗi có thể làm khóa AES được
export function ConvertFromNumberToString(number, lengthOfKey = 128) {
  var str = '';
console.log(number.bitLength().toString());
  if (!bigInt.isInstance(number) ||  number.bitLength()> lengthOfKey) {
    return false;
  }
  str = new Array(lengthOfKey - number.bitLength() + 1).join('0') + number.toString(2);
  var array = str.match(/(.{1,8})/g);
  return array.map(letter => String.fromCharCode(parseInt(letter, 2))).join('')
}




// let result = genKey(1024); //512 la keySize
// let m = bigInt(12345678987654321);
// let cipher = encrypt_RSA(m, result.public_key, result.n);
// let plain = decrypt_RSA(cipher, result.private_key, result.n);
// console.log("plain text", plain.value);
