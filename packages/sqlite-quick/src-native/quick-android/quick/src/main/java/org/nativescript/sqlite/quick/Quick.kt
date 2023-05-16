package org.nativescript.sqlite.quick

class Quick {
  companion object {

    private var didInit = false

    internal fun initLib() {
      if (didInit) {
        return
      }
      System.loadLibrary("quick")
      didInit = true
    }

    init {
      initLib()
    }

    @JvmStatic
    val instance = Quick()
  }
}
