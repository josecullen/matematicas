import static org.junit.Assert.*;

import org.junit.Test;

import factory.OperationExpression;

public class OperationExpressionTest {

	@Test
	public void stripBraces() {
		String expression = "( esta operaci�n no debe) quitar los braces";
		
		String result = OperationExpression.stripOuterBraces(expression);
		
		assertEquals(expression, result);
		
		expression = "( Esta operaci�n deber�a quitar los braces)";
		result = OperationExpression.stripOuterBraces(expression);
		assertNotEquals(expression, result);
		assertEquals("Esta operaci�n deber�a quitar los braces", result);
		
		expression = "  ( Esta operaci�n deber�a quitar los braces y los espacios en blanco)  ";
		result = OperationExpression.stripOuterBraces(expression);
		assertNotEquals(expression, result);
		assertEquals("Esta operaci�n deber�a quitar los braces y los espacios en blanco", result);
		
		
		expression = "  ( Esta operaci�n (deber�a quitar) los( braces y )los espacios en blanco)  ";
		result = OperationExpression.stripOuterBraces(expression);
		assertNotEquals(expression, result);
		assertEquals("Esta operaci�n (deber�a quitar) los( braces y )los espacios en blanco", result);
	}

}
