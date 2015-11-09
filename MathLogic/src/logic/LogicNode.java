package logic;

import java.util.HashMap;

public abstract class LogicNode {
	OperatorNode parent;
	
	boolean sign = false;
	
	public void setSign(boolean sign){
		this.sign = sign;
	}	
	
	abstract boolean getResult();
	public abstract void broadcast(String key, Object value);
	/**
	 * 
	 * @param zeroProb Posibilidad de que un valor tenga signo. Es inverso, a mayor n�mero, menores posibilidades: 1 / zeroProb
	 */
	abstract void randomize(int zeroProb, String names[], HashMap<String, Boolean> map);
	/**
	 * @return Retorna la expresi�n escrita de la operaci�n.
	 */
	public abstract String getExpression();
	abstract HashMap<String, Boolean> getVariables(HashMap<String, Boolean> map);
	
	void setParent(OperatorNode parent){
		this.parent = parent;
	}
}


