/**
 * Hermes / Expo Go polyfills for Supabase → webidl-conversions and related deps.
 * Those packages use ES2024 APIs that Hermes does not implement yet.
 */

// ES2024 String.prototype.toWellFormed — used by webidl-conversions DOMString().
if (typeof String.prototype.toWellFormed !== "function") {
  String.prototype.toWellFormed = function toWellFormed() {
    return Array.from(this)
      .map((char) => {
        const code = char.charCodeAt(0);
        return code >= 0xd800 && code <= 0xdfff ? "\uFFFD" : char;
      })
      .join("");
  };
}

function ensureGetter(proto, name, getValue) {
  const desc = Object.getOwnPropertyDescriptor(proto, name);
  if (desc && typeof desc.get === "function") return;
  Object.defineProperty(proto, name, {
    get: typeof getValue === "function" ? getValue : () => getValue,
    configurable: true,
  });
}

// ES2024 resizable ArrayBuffer — not available on Hermes.
ensureGetter(ArrayBuffer.prototype, "resizable", false);

if (typeof globalThis.SharedArrayBuffer === "undefined") {
  const byteLengthDesc = Object.getOwnPropertyDescriptor(
    ArrayBuffer.prototype,
    "byteLength",
  );

  function SharedArrayBufferPolyfill(length) {
    return new ArrayBuffer(length);
  }

  SharedArrayBufferPolyfill.prototype = Object.create(ArrayBuffer.prototype);

  if (byteLengthDesc?.get) {
    Object.defineProperty(
      SharedArrayBufferPolyfill.prototype,
      "byteLength",
      byteLengthDesc,
    );
  } else {
    ensureGetter(SharedArrayBufferPolyfill.prototype, "byteLength", function () {
      return ArrayBuffer.prototype.byteLength.call(this);
    });
  }

  ensureGetter(SharedArrayBufferPolyfill.prototype, "growable", false);

  globalThis.SharedArrayBuffer = SharedArrayBufferPolyfill;
} else {
  ensureGetter(SharedArrayBuffer.prototype, "growable", false);
}
