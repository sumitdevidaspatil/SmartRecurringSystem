package com.cs.rd.aop;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class aopaspectclass
{
	    // Pointcut → where to apply AOP
	    @Pointcut("execution(* com.cs.rd.service.*.*(..))")
	    public void serviceMethods() {}

	    // Before method execution
	    @Before("serviceMethods()")
	    public void logBefore(JoinPoint joinPoint) {
	        System.out.println("Before method: " + joinPoint.getSignature().getName());
	    }

	    // After method execution
	    @After("serviceMethods()")
	    public void logAfter(JoinPoint joinPoint) {
	        System.out.println("After method: " + joinPoint.getSignature().getName());
	    }

	    // After returning result
	    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
	    public void logAfterReturning(JoinPoint joinPoint, Object result) {
	        System.out.println("Method returned: " + result);
	    }

	    // Around (most powerful)
	    @Around("serviceMethods()")
	    public Object logAround(org.aspectj.lang.ProceedingJoinPoint joinPoint) throws Throwable {
	        System.out.println("Around BEFORE: " + joinPoint.getSignature().getName());

	        Object result = joinPoint.proceed();

	        System.out.println("Around AFTER: " + joinPoint.getSignature().getName());
	        return result;
	    }
	}
