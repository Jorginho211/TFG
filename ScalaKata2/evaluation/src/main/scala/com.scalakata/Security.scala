package com.scalakata

import java.security._
import java.io._


class Secured(security: Boolean) {
  private var started = false

  class ScalaKataSecurityPolicy extends Policy {
    val read1 = new java.io.FilePermission("../-", "read")
    val read2 = new java.io.FilePermission("../.", "read")
    val other = new java.net.NetPermission("specifyStreamHandler")

    override def implies(domain: ProtectionDomain, permission: Permission) = {
      List(read1, read2, other).exists(_.implies(permission)) ||
      Thread.currentThread().getStackTrace().find(_.getFileName == "(inline)").isEmpty
    }
  }
  def apply[T](f: ⇒ T): T = {
    if(!started && security) {
      started = true
      Policy.setPolicy(new ScalaKataSecurityPolicy)
      System.setSecurityManager(new SecurityManager)
    }
    f
  }
}
